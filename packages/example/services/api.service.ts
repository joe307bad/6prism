import ApiGateway from "moleculer-web";
import { Method, Service } from "moleculer-decorators";
import { ServerResponse } from "http";
import Moleculer from "moleculer";
const Errors = ApiGateway.Errors;
const { UnAuthorizedError } = Errors;

@Service({
	name: "api",
	mixins: [ApiGateway],
	settings: {
		port: process.env.PORT || 3000,
		routes: [
			{
				path: "/api",
				whitelist: ["**"],
				use: [],
				mergeParams: true,
				authentication: false,
				authorization: true,
				autoAliases: true,
				aliases: {},
				callingOptions: {},
				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB",
					},
					urlencoded: {
						extended: true,
						limit: "1MB",
					},
				},
				mappingPolicy: "all",
				logging: true,
			},
		],
		log4XXResponses: true,
		logRequestParams: null,
		logResponseData: null,
		assets: {
			folder: "public",
			options: {},
		},
	},
})
export default class ApiService extends Moleculer.Service {
	public constructor(broker: Moleculer.ServiceBroker) {
		super(broker);
	}

	@Method
	authorize(ctx, route, req, res: ServerResponse) {
		return Promise.reject(
			new UnAuthorizedError(Errors.ERR_INVALID_TOKEN, "Failure sorry!")
		);
	}
}
