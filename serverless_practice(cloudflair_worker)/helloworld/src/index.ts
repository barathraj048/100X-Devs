export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log(request.body)
		console.log(request.method)
		if(request.method=='GET'){
			return new Response("from get method");
		}

	},
} satisfies ExportedHandler<Env>;
