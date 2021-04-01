import {LOG} from "./Logger";


const list: BlinkNode[] = [];

class BlinkNode {
    index: number;
    name: string;

    constructor(index: number, name: string) {
        this.index = index;
        this.name = name;
    }

    get next() {
        return list[this.index + 1];
    }

    get previous() {
        return list[this.index - 1];
    }
}

class LinkedListNode {
    next: LinkedListNode;
    previous: LinkedListNode;
    name: string;
    index: number;
    
    constructor(name: string, index: number) {
        this.name = name;
        this.index = index;
    }

    tail(): boolean {
        return this.next !== undefined;
    }

    head(): boolean {
        return this.head !== undefined;
    }
}

export const testBlinkList = () => {
    //const list = BlinkList<string>(); 
    
    // test singlylinkedlist
    let start = new LinkedListNode('naam1', 0);
    let current = start;

    for (let i = 1; i < 1000; i++) {
        let next = new LinkedListNode(`naam${i}`, i);
        current.next = next;
        current = next;
    }

    for (let i = 0; i < 1000; i++) {
        list.push(new LinkedListNode(`naam${i}`, i));
    }
    
    
    // traverse the list.
    console.time("linklist");
    current = start;
    let str2 = "";
    while (current.next) {
        str2 += current.name;
        current = current.next;
    }
    console.timeEnd("linklist");

    // traverse the list.
    console.time();
    let str = "";
    for (let item of list) {
        str += item.name;
    }
    console.timeEnd();


    //const previous = tail.getPrevious();
    //console.group('prev and next', previous, previous.getPrevious());
    //previous.push('greet');
    //console.log('tail', tail.getNext());
    //console.table(listItem);
}
