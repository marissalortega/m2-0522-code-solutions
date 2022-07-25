select  "actors"."firstName",
        "actors"."lastName"
  from "castMembers"
  join "actors" using ("actorId")
  join "films" using ("filmId")
  where "films"."title" = 'Jersey Sassy';
