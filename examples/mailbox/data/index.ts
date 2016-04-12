export interface Message {
  id: number;
  from: string;
  to: string;
  date: Date;
  subject: string;
  body: string;
}
export interface Mailbox {
  name: string;
  id: string;
  messages: Message[];
}
export interface Folders {
  mailboxes: Mailbox[];
}

export const data = {
  mailboxes: [
    {
      name: "Inbox",
      id: "inbox",
      messages: [
        {
        id: 1,
        subject: "Welcome to NOML",
        from: "adam@example.com",
        to: "user@example.com",
        date: new Date(),
        body: "Welcome to NOML. We hope you enjoy your stay"
        }, {
        id: 2,
        subject: "Great NOML Resources",
        from: "adam@example.com",
        to: "user@example.com",
        date: new Date(),
        body: "Have you seen google.com? How about facebook.com?"
        }
      ]
    },
    {
      name: "Spam",
      id: "spam",
      messages: [
        {
        id: 3,
        subject: "You have one the lottery!!!111ONEONE",
        from: "419@thereallotteryhonest.com",
        to: "user@example.com",
        date: new Date(),
        body: "You have ONE the lottery! You only have to send us a small amount of monies to claim your prize"
        }
      ]
    },
    {
      name: "Sent Mail",
      id: "sent-mail",
      messages: [
        {
        id: 4,
        subject: "Should I use NOML",
        from: "user@example.com",
        to: "adam@example.com",
        date: new Date(),
        body: "NOML looks pretty good, should I use it?"
        }
      ]
    }
  ]
};
