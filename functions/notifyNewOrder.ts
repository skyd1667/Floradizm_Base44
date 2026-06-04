import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const base44 = createClientFromRequest(req);

    const order = body.data;
    if (!order) {
      return Response.json({ error: 'No order data' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    // Build the email content
    const orderNumber = order.order_number || order.id || 'N/A';
    const customerName = order.customer_name || '고객';
    const customerEmail = order.customer_email || '';
    const totalAmount = order.total_amount ? order.total_amount.toLocaleString() : '0';
    const items = order.items || [];

    const itemsList = items.map(item =>
      `  - ${item.product_name_ko || item.product_name_en || '제품'} × ${item.quantity} (${(item.total_price || 0).toLocaleString()}원)`
    ).join('\n');

    const shippingAddr = order.shipping_address
      ? `${order.shipping_address.recipient_name} / ${order.shipping_address.address1} ${order.shipping_address.address2 || ''}, ${order.shipping_address.postal_code} / ${order.shipping_address.phone || ''}`
      : '주소 정보 없음';

    const emailBody = `새 주문이 접수되었습니다. 즉시 배송 준비를 시작해 주세요.

━━━━━━━━━━━━━━━━━━━━━━━━━
주문번호: ${orderNumber}
고객명: ${customerName}
이메일: ${customerEmail}
결제금액: ${totalAmount}원

[주문 상품]
${itemsList || '  상품 정보 없음'}

[배송지]
${shippingAddr}
━━━━━━━━━━━━━━━━━━━━━━━━━

Floradizm 관리자 패널에서 주문을 처리해 주세요.`;

    // Build RFC 2822 email using base64url encoding
    const subject = `[Floradizm] 새 주문 접수 - ${orderNumber} (${totalAmount}원)`;

    const emailLines = [
      `To: me`,
      `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
      `Content-Type: text/plain; charset=UTF-8`,
      ``,
      emailBody
    ].join('\r\n');

    const encoded = btoa(unescape(encodeURIComponent(emailLines)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encoded }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: 500 });
    }

    return Response.json({ success: true, order_number: orderNumber });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
