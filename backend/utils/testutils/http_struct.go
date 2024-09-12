package testutils

type HTTPRequest struct {
	Method string
	Url    string
	Body   map[string]interface{}
}

type HTTPResponse struct {
	Code int
	Body map[string]interface{}
}
