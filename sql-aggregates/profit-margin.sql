select count("filmId") as "totalCopiesOfFilm"
  from "inventory"
  group by "filmId"
  order by "filmId";
