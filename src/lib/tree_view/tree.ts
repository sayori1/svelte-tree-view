export class Tree {
    name: string;
    open: boolean;
    rename: boolean;
    children: Tree[];
    parent: Tree | null;
    selected: boolean;

    constructor(name: string, open: boolean, rename: boolean = false, children: Tree[] = [], parent: Tree | null = null, selected: boolean = false) {
        this.name = name;
        this.open = open;
        this.children = children;
        this.parent = parent;
        this.rename = rename;
        this.selected = selected;
        this.children.forEach((child) => (child.parent = this));
    }

    getFullPath(): string {
        let path = this.name;
        let node: Tree = this;
        while (node.parent) {
            node = node.parent;
            path = `${node.name}/${path}`;
        }
        return path;
    }

    getRelativePath(level: number): string {
        let path = this.name;
        let node: Tree = this;
        while (level > 0 && node.parent) {
            node = node.parent;
            path = `${node.name}/${path}`;
            level--;
        }
        return path;
    }

    map(fn: (node: Tree) => Tree): Tree {
        const copy = new Tree(this.name, this.open, this.rename, []);
        copy.children = this.children.map((child) => child.map(fn));
        return fn(copy);
    }

    forEach(fn: (node: Tree) => void): void {
        fn(this);
        this.children.forEach((child) => child.forEach(fn));
    }

    filter(fn: (node: Tree) => boolean): Tree[] {
        return this.children
            .filter(fn)
            .flatMap((child) => [child, ...child.filter(fn)]);
    }

    push(node: Tree): void {
        node.parent = this;
        this.children.push(node);
    }

    remove(): void {
        if (this.parent) {
            const index = this.parent.children.indexOf(this);
            this.parent.children.splice(index, 1);
            this.parent = null;
        }
    }

    duplicate(): this {
        const clonedChildren = this.children.map(child => child.duplicate());
        const newInstance = Object.create(Object.getPrototypeOf(this)) as this;
        newInstance.name = this.name;
        newInstance.open = this.open;
        newInstance.children = clonedChildren;
        newInstance.parent = null;
        newInstance.children.forEach((child) => (child.parent = newInstance));
        return newInstance;
    }    

    toJson(): string {
        return JSON.stringify(this);
    }

    toObject(): any {
        const obj = {
            name: this.name,
            open: this.open,
            rename: this.rename,
            children: this.children.map(child => child.toObject()),
            selected: this.selected
        };
        return obj;
    }
    
    static fromJson(json: string): Tree {
        const obj = JSON.parse(json);
        const children = obj.children.map((childJson: string) =>
            Tree.fromJson(childJson)
        );
        return new Tree(obj.name, obj.open, obj.rename, children, obj.parent);
    }
    
    getRoot(): Tree {
        let node: Tree = this;
        while (node.parent) {
            node = node.parent;
        }
        return node;
    }
}
