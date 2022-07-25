select "g"."name" as "genre",
  count("f".*) as "numberofFilms"
  from "genres" as "g"
  join "filmGenre" using ("genreId")
  join "films" as "f" using ("filmId")
  join "castMembers"using ("filmId")
  join "actors" as "a" using ("actorId")
  where "a"."firstName" = 'Lisa'
  and "a"."lastName" = 'Monroe'
  group by "g"."name";
