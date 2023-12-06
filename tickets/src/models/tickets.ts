import mongoose from "mongoose";

//this is the interface that describes the required properties to create a new ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

//this is the interface that describes the properties that a ticket document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc; // this types the function that will be used to create a new ticket
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    // this is the configuration object that will be used to format the JSON object that will be returned
    toJSON: {
      //
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// this is the function that will be used to create a new ticket
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  // this is the function that will be used to create a new ticket
  return new Ticket(attrs);
};

//Ticket is the name of the model
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
