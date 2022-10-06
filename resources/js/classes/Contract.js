export class Contract {
    response;

    constructor(url, method, data, name = null, download = true) {
        this.url = url;
        this.method = method.toUpperCase();
        this.data = data;
        this.download = download;
        this.name = name;
        // console.log('this.data Contr');
        // console.log(this.data);

        if(this.download)
            this.create();
        if(data && data.hasOwnProperty('output'))
            this.name += '.' + data['output'];
    }

    async create() {
        let responseType = 'json';
        if(this.download) {
            responseType = 'blob';
        }
        // console.log('responseType');
        // console.log(responseType);
        await axios({
            url: this.url,
            method: this.method,
            responseType: responseType,
            data: this.data,
        }).then(response => {
            if(!this.download) {
                this.response = response.data;
                // console.log('---------this.response---------');
                // console.log(typeof this.response);
                // console.log(this.response);
                // console.log('this.data');
                // console.log(typeof this.data);
                // console.log(this.data);
                // console.log(typeof data);
                // console.log(data);
                return ;
            }
            // console.log('---------this.response---------');
            // console.log(typeof this.response);
            // console.log(this.response);
            // console.log('this.data');
            // console.log(typeof this.data);
            // console.log(this.data);
            // console.log(typeof data);
            // console.log(data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // console.log('url');
            // console.log(typeof url);
            // console.log(url);
            const link = document.createElement('a');
            link.href = url;
            // console.log('---------link---------');
            // console.log(link);
            link.setAttribute('download', `${this.name}`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    async get() {
        await this.create();
        // console.log('---------this.response2---------');
        // console.log(this.response);
        return this.response;
    }
}