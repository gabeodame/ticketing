import axios from "axios";

export async function POST(req: Request) {
  const session = req.headers.get("session");
  const headers = {
    "Content-Type": "application/json",
    Host: "ticketing.dev",
    Cookie: `session=${session}`,
  };
  const body = {
    email: "gabeodame@gmail.com",
    passwod: "password",
  };

  if (typeof window === "undefined") {
    const { data } = await axios.post(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signup",
      body,
      {
        headers: headers,
      }
    );

    return new Response(data, {
      headers: {
        "content-type": "application/json",
        "set-cookie": `session=${session}`,
      },
    });
  } else {
    const { data } = await axios.post("/api/users/signup");
    console.log(data);
    return data;
  }
}
