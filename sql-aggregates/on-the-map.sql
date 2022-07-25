select "countries"."name" as "country",
  count("cities"."name") as "cities"
  from "cities"
  join "countries" using ("countryId")
  group by "countryId"
  order by "countries"."name";
