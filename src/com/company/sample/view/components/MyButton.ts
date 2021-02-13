export default class MyButton {

    private text: string;
    private parent: HTMLElement;
    private callback: (id: any) => any;


    constructor(parent: HTMLElement, text: string, callback: (a: any) => any) {
        this.parent = parent;
        this.text = text;
        this.callback = callback;
    }


    render() {
        var me = this;
        const button = document.createElement('button');
        button.textContent = this.text;
        button.style.backgroundColor = 'yellow';

        button.addEventListener('click', function () {
            me.callback(me.text);
        });
        this.parent.appendChild(button);
    }



}

