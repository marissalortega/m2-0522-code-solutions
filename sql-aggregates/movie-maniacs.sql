select "c"."firstName" as "firstName",
  "c"."lastName" as "lastName",
  sum("p"."amount") as "totalAmount"
  from "customers" as "c"
  join "payments" as "p" using ("customerId")
  group by "c"."firstName", "c"."lastName"
  order by "totalAmount" desc;
