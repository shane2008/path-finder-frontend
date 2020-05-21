
import http from "../http";

class BackendService {
  getPath(params) {
    return http.get("/get-path", {params});
  }

  validateFile(file) {
    let formData = new FormData();
    formData.append("file", file);

    return http.post("/uploader", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }

}

export default new BackendService();