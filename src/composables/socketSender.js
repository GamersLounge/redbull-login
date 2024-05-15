export function useSocketSender() {

    /**
     * Send tab data to the main process with the tab metadata.
     *
     * @param {String} eventName
     * @param data
     */
    function emitData(eventName, data) {

        console.group(`${this.$route.name}:${eventName}`);
        console.log(data ? JSON.parse(JSON.stringify(data)) : "No data found..");
        console.groupEnd();

        window.electron.ipcRenderer.send("tabData", {
            pageURL: this.$route.path,
            pageTitle: this.$route.name,
            eventName,
            payload: data,
        });
    }

    return {
        emitData,
    };
}
