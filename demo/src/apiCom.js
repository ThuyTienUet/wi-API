/**
 * @fileoverview Module
 */
/**
 * @module API_Communication
 */
/**
 * @param {String} name
 * @implements Method: POST
 * @implements Route: /conversation
 * @implements Note: 
 * @example Example Response: 
{
}
 * @example Example Payload: 
{
	"name" : "chat"
}
 */
function Info_conversation(name) {}
/**
 * @param {String} content
 * @param {String} type
 * @param {Int} idSender
 * @param {Int} idConversation
 * @implements Method: POST
 * @implements Route: /message/new
 * @implements Note: - content vs image/file là path. type vs image/file là 'image'/'file' nếu k là 'text'
 * @example Example Response: 
{
}
 * @example Example Payload: 
{
	"content" : "hello", 
	"type" : "text", 
	"idSender" : 1, 
	"idConversation" : 1
}
 */
function Save_message(content, type, idSender, idConversation) {}
/**
 * @param {File} file
 * @param {JSON} fields
 * @implements Method: POST
 * @implements Route: /upload
 * @implements Note: - name là tên của conversation
 * @example Example Response: 
{
}
 * @example Example Payload: 
{
	"file" : "file*", 
	"fields" : {
		"name" : "chat"
	}
}
 */
function Upload_image_or_file(file, fields) {}