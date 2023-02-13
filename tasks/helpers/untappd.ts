import { UserActivityFeedResponse } from "./types.ts";

export interface UntappdOptions {
  readonly clientId?: string;
  readonly clientSecret?: string;
}

export interface GetUserBeersOptions {
  readonly username: string;
  readonly max_id?: number;
  readonly min_id?: number;
}

export class Untappd {
  static BASE_URL = "https://api.untappd.com";
  readonly clientId;
  readonly clientSecret;
  readonly api;

  constructor(options: UntappdOptions = {}) {
    const clientId = options.clientId ?? Deno.env.get("UNTAPPD_CLIENT_ID");
    const clientSecret = options.clientSecret ?? Deno.env.get("UNTAPPD_CLIENT_SECRET");

    if (clientId === undefined || clientSecret === undefined) {
      throw new Error("Both client id and client secret must be defined");
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;

    const authParams = new URLSearchParams();
    authParams.set("client_id", this.clientId);
    authParams.set("client_secret", this.clientSecret);
    const headers = { "User-Agent": `curtis beers ${this.clientId}` };

    this.api = async (url: string, additionalParams?: URLSearchParams) => {
      const params = additionalParams != null ? new URLSearchParams([...authParams, ...additionalParams]) : authParams;

      const fullUrl = new URL(`${url}?${params.toString()}`, Untappd.BASE_URL);
      return await fetch(fullUrl, { headers }).then((r) => r.json());
    };
  }

  async getUserBeers(opts: GetUserBeersOptions) {
    const params = new URLSearchParams({ limit: "50" });
    if (opts.max_id !== undefined && opts.max_id !== 0) {
      params.append("max_id", opts.max_id.toString());
    }
    if (opts.min_id !== undefined && opts.min_id !== 0) {
      params.append("min_id", opts.min_id.toString());
    }

    const res = (await this.api(`/v4/user/checkins/${opts.username}`, params)) as UserActivityFeedResponse;

    if (res.meta.code !== 200) {
      throw new Error(JSON.stringify(res.meta));
    }

    return res.response;
  }
}
