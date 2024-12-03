export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log(request.body)
		console.log(request.method)
		if(request.method=='GET'){
			return new Response("from get method");
		}else {
			// Handle other request methods
			return new Response("Method not supported", { status: 405 }); // 405: Method Not Allowed
		 }
	},
} satisfies ExportedHandler<Env>;
