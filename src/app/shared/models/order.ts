export class Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    courseType: string;
    isSpecial: boolean;

    constructor({id, name, description, price, imageUrl, courseType, isSpecial}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.courseType = courseType;
        this.isSpecial = isSpecial;
    }
}

export class Item {
    product: Dish;
    quantity: number;

    constructor({product, quantity}) {
        this.product = product;
        this.quantity = quantity;
    }

    get subtotal(): number {
        return this.product.price * this.quantity;
    }
}

export class Order {
    id: string;
    clientname: string;
    items: Item[];
    email: string;
    address: string;
    phone: string;
    pickup: boolean;
    deliveryFees: number;
    tip: number;
    eta: number;
    fulfilled: boolean;
    createdAt: Date;

    constructor({id, clientname, items, email, address, phone, pickup, deliveryFees, tip, eta, fulfilled, createdAt}) {
        this.id = id;
        this.clientname = clientname;
        this.items = items;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.pickup = pickup;
        this.deliveryFees = deliveryFees;
        this.tip = tip;
        this.eta = eta;
        this.fulfilled = fulfilled
        this.createdAt = createdAt
    }

    setStatus(status: boolean) {
        this.fulfilled = status;
    }

    get noTaxTotal(): number {
        return this.items.reduce((prev, cur) => prev + cur.subtotal, 0.0);
    }

    get hst(): number {
        return (this.noTaxTotal * 1.13) - this.noTaxTotal;
    }

    get chargedTip(): number {
        return (this.noTaxTotal * (this.tip / 100 + 1)) - this.noTaxTotal;
    }

    get total(): number {
        return this.noTaxTotal + this.hst + this.chargedTip + this.deliveryFees;
    }
}