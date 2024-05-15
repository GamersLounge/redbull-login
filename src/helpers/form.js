/*
|--------------------------------------------------------------------------
| Form Class
|--------------------------------------------------------------------------
|
| This collect form data from Vue components, send requests to the server
| check response for validation error and if they exist map them to Error class
| and finally return a promise.
|
*/

import axios from "@plugins/axios.js";

export class Form {

    /**
     * Create new Form instance.
     *
     * @param {object} payload
     */
    constructor(payload) {

        this.rawData = payload;

        for (let field in payload) {

            this[field] = payload[field] || "";
        }

        // this.errors = new Errors();
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {

        let formData = new FormData();

        for (let property in this.rawData) {

            formData.append(property, this[property]);
        }

        return formData;
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

        let formData = this.data();

        const imageFields = ["image", "logo", "avatar", "file"];

        // Remove image field from form data if it's empty
        for (let field in this.rawData) {

            if (imageFields.includes(field) && !this[field]) {
                formData.delete(field);
            }
        }

        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        console.log([...formData])

        return axios[requestType](url, formData, config);
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
