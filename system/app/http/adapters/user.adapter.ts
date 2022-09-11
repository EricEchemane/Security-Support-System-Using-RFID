import HttpAdapter from "../base-adapter";
import useHttpAdapter from "../useHttpAdapter";

const StudentAdapter = Object.freeze({
    FindByRfid: () => useHttpAdapter<
        null,
        { rfid: string; }
    >(new HttpAdapter("/api/student/:rfid", 'GET')),
});

export default StudentAdapter;