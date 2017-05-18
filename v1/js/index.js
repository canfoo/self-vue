function SelfVue (data, el, exp) {
    this.data = data;
    observe(data);
    el.innerHTML = this.data[exp];
    new Watcher(this.data, exp, function (value) {
        el.innerHTML = value;
    });
    this.data.name = this.data.name;
    return this;
}
