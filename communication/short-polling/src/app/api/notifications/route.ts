let notifications: {
    id: number;
    message: string;
    time: string;
}[] = [];

let id = 1;

// lets simulate a server change
setInterval(() => {
    notifications.push({
        id: id++,
        message: `Notification ${id}`,
        time: new Date().toISOString(),
    });
}, 2000);


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    console.log("searchParams", searchParams);
    const lastId = Number(searchParams.get('lastId') ?? 0);

    const newNotifications = notifications.filter(notification => notification.id > lastId)

    return Response.json(newNotifications);
}
