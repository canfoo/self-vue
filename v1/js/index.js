function SelfVue (data, el, exp) {
    this.data = data;
    observe(data);
    el.innerHTML = this.data[exp];  // 初始化模板数据的值
    new Watcher(this.data, exp, function (value) {
        el.innerHTML = value;
    });
    return this;
}
