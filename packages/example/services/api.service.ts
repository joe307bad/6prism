import ApiGateway from "moleculer-web";
import { Method, Service } from "moleculer-decorators";
import { ServerResponse } from "http";
import Moleculer from "moleculer";
import Keycloak from "keycloak-backend";

const Errors = ApiGateway.Errors;
const { UnAuthorizedError } = Errors;

const keycloak = Keycloak({
	realm: "six.prism",
	"auth-server-url": "https://keycloak.six.prism/",
	client_id: "account",
	// client_secret: "c88a2c21-9d1a-4f83-a18d-66d75c4d8020", // if required
	// username: "your service username",
	// password: "your service password",
});

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
	async authorize(ctx, route, req, res: ServerResponse) {
		// TODO how do we trust a self signed cert?
		process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
		const auth = req?.headers["authorization"];
		const keycloakToken = await (async () => {
			try {
				return await keycloak.jwt.verify((auth || "").slice(7));
			} catch (e) {
				return false;
			}
		})();

		if (!keycloakToken)
			return Promise.reject(
				new UnAuthorizedError(Errors.ERR_INVALID_TOKEN, "")
			);

		ctx.meta.jwt = decodeJwt(keycloakToken.token);
		return Promise.resolve(ctx);
	}
}

const decodeJwt = (token: string) => {
	if (token !== null || token !== undefined) {
		const base64String = token.split(".")[1];
		const decodedValue: Record<string, unknown> = JSON.parse(
			Buffer.from(base64String, "base64").toString("ascii")
		);
		return decodedValue;
	}
	return null;
};
