export abstract class Kaizen {
    private readonly id: Optional<KaizenId>;

    constructor(id?: KaizenId) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }
}