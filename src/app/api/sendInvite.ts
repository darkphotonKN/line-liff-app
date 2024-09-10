import fetch from "node-fetch";

export async function POST(req: Request) {
	const { userId } = await req.json();

	// Send a message via LINE Messaging API
	const response = await fetch(`https://api.line.me/v2/bot/message/push`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer {YOUR_CHANNEL_ACCESS_TOKEN}`, // Replace with your access token
		},
		body: JSON.stringify({
			to: userId,
			messages: [
				{
					type: "text",
					text: "Please add our Official Account by clicking here!",
				},
			],
		}),
	});

	if (response.ok) {
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} else {
		return new Response(JSON.stringify({ error: "Failed to send invite" }), {
			status: 500,
		});
	}
}
