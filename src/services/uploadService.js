import http from "./httpService";

class UploadFilesService {
    upload(data, onUploadProgress) {
        let formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key])
        }
        console.log(data.file)
        return http.post("/appointments/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "*/*"
            },
            onUploadProgress,
        });
    }

    update(data, id) {
        let formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key])
        }
        console.log(data.file)
        return http.put("/appointments/update/" + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "*/*"
            }
        });
    }
}
export default new UploadFilesService();
