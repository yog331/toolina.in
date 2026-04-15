import { initDb } from './_db';

export async function onRequestGet(context: any) {
  await initDb(context.env);
  const { results } = await context.env.DB.prepare("SELECT * FROM announcements").all();
  return Response.json(results);
}

export async function onRequestPost(context: any) {
  await initDb(context.env);
  const announcements = await context.request.json();
  
  const stmts = [context.env.DB.prepare("DELETE FROM announcements")];
  for (const a of announcements) {
    stmts.push(
      context.env.DB.prepare("INSERT INTO announcements (id, date, content, color) VALUES (?, ?, ?, ?)")
        .bind(a.id, a.date, a.content, a.color)
    );
  }
  await context.env.DB.batch(stmts);
  
  return Response.json({ success: true });
}
