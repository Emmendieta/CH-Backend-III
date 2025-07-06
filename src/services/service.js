class Service {
    constructor(repository) {
        this.repository = repository;
    };
    createOne = async (data) => await this.repository.createOne(data);
    readAll = async () => await this.repository.readAll();
    readById = async (pid) => await this.repository.readById(pid);
    readByFilter = async (filter) => await this.repository.readByFilter(filter);
    updateById = async (pid, data) => await this.repository.updateById(pid, data);
    destroyById = async (pid) => await this.repository.destroyById(pid);
};

export default Service;