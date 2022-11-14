export const getDefaultItems = () => [
  {
    issuekey: "KEY-1",
    type: "Epic",
    summary: "This is summary of Epic 1",
    status: "InProgress",
    children: [
      {
        issuekey: "KEY-3",
        type: "Feature",
        summary: "This is summary of Feature A",
        status: "Open"
      },
      {
        issuekey: "KEY-4",
        type: "Feature",
        summary: "This is summary of Feature B",
        status: "InProgress",
        children: [
          {
            issuekey: "KEY-5",
            type: "Story",
            summary: "This is summary of Story X",
            status: "Open"
          },
          {
            issuekey: "KEY-6",
            type: "Story",
            summary: "This is summary of Story Y",
            status: "InProgress",
            children: [
              {
                issuekey: "KEY-8",
                type: "Task",
                summary: "This is summary of Task",
                status: "InProgress"
              }
            ]
          },
          {
            issuekey: "KEY-7",
            type: "Story",
            summary: "This is summary of Story Z",
            status: "Open"
          }
        ]
      }
    ]
  },
  {
    issuekey: "KEY-2",
    type: "Epic",
    summary: "This is summary of Epic 2",
    status: "Open"
  }
];

let lastId = 8;
export const fetchNewItems = async () => {
  const id = ++lastId;
  return [
    {
      issuekey: `KEY-${id}`,
      type: "New type",
      summary: "New summary",
      status: "Open",
      children: []
    },
  ];
};

export default getDefaultItems();
