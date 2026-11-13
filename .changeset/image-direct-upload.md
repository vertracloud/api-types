---
"@vertracloud/api-types": patch
---

Direct upload of image build contexts: `POST /v1/images/uploads` (`RESTPostAPICustomImageUploadBody`, `APICustomImageUpload`, in the `images:write` scope), `upload_id` in `POST /v1/images` and `PUT /v1/images/:image_id`, and the error codes `IMAGE_UPLOAD_NOT_FOUND` and `IMAGE_UPLOAD_INCOMPLETE`.
