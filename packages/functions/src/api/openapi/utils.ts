import type { Context } from "openapi-backend";

const getParamValue = (param?: string | string[]) =>
	Array.isArray(param) ? param[0] : param;

export const useParam = (
	c: Context,
	paramName: string,
	default_value?: string,
) => {
	const param = c.request.params[paramName] || c.request.query[paramName];

	return getParamValue(param) ?? default_value;
};

export const getArrayParam = (
	c: Context,
	paramName: string,
	default_value?: string[],
) => {
	const param = c.request.params[paramName] || c.request.query[paramName];

	if (!param) {
		return default_value;
	}

	return Array.isArray(param) ? param : param?.split(",");
};

export const usePath = (c: Context) => {
	return c.request.path;
};

export const useBody = <T>(c: Context) => {
	return c.request.requestBody as T;
};

export const useHeader = (c: Context, header: string) => {
	return c.request.headers[header];
};

export const useHeaders = (c: Context) => {
	return c.request.headers;
};

export const useQuery = (c: Context) => {
	return c.request.query;
};
