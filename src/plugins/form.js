/*
|--------------------------------------------------------------------------
| Form Class
|--------------------------------------------------------------------------
|
| This collect form data from Vue components, send requests to the server
| check response for validation error and if they exist map them to Error class
| and finally return a promise.
|
| This code is copied from Laracasts.
|
*/

/*
 * Import Errors class
 */
import Errors from "./errors";
import Store from "../store/index"

class Form {

    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data) {

        this.originalData = data;

        for (let field in data) {

            this[field] = data[field];
        }

        this.errors = new Errors();
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {

        // let data = {};
        let data = new FormData();

        for (let property in this.originalData) {


            if (property === "photos") {

                for( let i = 0; i < this[property].length; i++ ){

                    let file = this[property][i];
                    data.append('photos[' + i + ']', file);
                }


            } else {
                data.append(property, this[property]);

            }
            // data[property] = this[property];
        }

        // for (let [key, value] of data.entries()) {
        //     console.log(key + ":", value);
        // }

        return data;
    }

    /**
     * Reset the form fields.
     */
    reset() {

        for (let field in this.originalData) {

            this[field] = "";
        }

        this.errors.clear();
    }

    /**
     * Send a POST request to the given URL.
     *
     * @param {string} url
     */
    post(url) {

        return this.submit("post", url);
    }

    /**
     * Send a PUT request to the given URL.
     *
     * @param {string} url
     */
    put(url) {




        return this.submit("put", url);
    }

    /**
     * Send a PATCH request to the given URL.
     *
     * @param {string} url
     */
    patch(url) {

        return this.submit("patch", url);
    }

    /**
     * Send a DELETE request to the given URL.
     *
     * @param {string} url
     */
    delete(url) {

        return this.submit("delete", url);
    }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
    submit(requestType, url) {

        // Handle Laravel issue with PUT and PATCH methods
        let formData = this.data();

        if (requestType === "put" || requestType === "patch") {

            requestType = "post";
            formData.append("_method", "PUT");
        }

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {

                Store.commit("uploads/setProgress", Math.round( (progressEvent.loaded * 100) / progressEvent.total ))
            }
        };


        return new Promise((resolve, reject) => {

            Store.commit("uploads/setUploadStatus", 1);

            console.log(formData);


            axios[requestType](url, formData, config)
                .then(response => {

                    this.onSuccess(response.data);

                    resolve(response);
                })
                .catch(error => {

                    if (error.response.status === 422) {

                        this.onFail(error.response.data.errors.details);
                    }

                    reject(error);
                }).finally(() => {
                Store.commit("uploads/setUploadStatus", 0);
            });
        });
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess(data) {

        this.reset();
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {

        this.errors.record(errors);
    }
}

/*
 * Export the form.
 */
export default Form;
