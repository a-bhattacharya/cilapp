var express = require("express");
var router = express.Router();

const dbQuery = require("../services/db_queries");

router.get("/rake-query/", (req, res, next) => {
  const query = `select cnsr,1 sub_rank,
count(*) total_rakes,
sum(k.rakes_5_12hrs) + sum(k.rakes_12hrs) rakes_5hrs,
to_char(to_date(round(sum(k.load_diff_minutes)/count(*)*60),'sssss'),'hh24:mi') avg_load_rakes,
to_char(to_date(round(sum(k.diff_minutes)/count(*)*60),'sssss'),'hh24:mi') avg_turn_rakes
from 
(select DMNDID,cnsr,LDNGSTTN,max(LDNGSTRTTIME) LDNGSTRTTIME,max(RMVLTIME) RMVLTIME,
 abs(24*extract(day from max(RMVLTIME)-max(LDNGSTRTTIME))+extract(hour from max(RMVLTIME)-max(LDNGSTRTTIME)))*60+extract( minute from max(RMVLTIME)-max(LDNGSTRTTIME)) diff_minutes,
 max(LDNGCMPLTIME) LDNGCMPLTIME,
 abs(24*extract(day from max(LDNGCMPLTIME)-max(LDNGSTRTTIME))+extract(hour from max(LDNGCMPLTIME)-max(LDNGSTRTTIME)))*60+extract( minute from max(LDNGCMPLTIME)-max(LDNGSTRTTIME)) load_diff_minutes,
 (case when (abs(24*extract(day from max(RMVLTIME)-max(LDNGSTRTTIME))+extract(hour from max(RMVLTIME)-max(LDNGSTRTTIME)))>5 and abs(24*extract(day from max(RMVLTIME)-max(LDNGSTRTTIME))+extract(hour from max(RMVLTIME)-max(LDNGSTRTTIME)))<=11 )
or ( abs(24*extract(day from max(RMVLTIME)-max(LDNGSTRTTIME))+extract(hour from max(RMVLTIME)-max(LDNGSTRTTIME)))=5 and  extract( minute from max(RMVLTIME)-max(LDNGSTRTTIME))>0 )
  or ( abs(24*extract(day from max(RMVLTIME)-max(LDNGSTRTTIME))+extract(hour from max(RMVLTIME)-max(LDNGSTRTTIME)))=12 and  extract( minute from max(RMVLTIME)-max(LDNGSTRTTIME))=0 )
then 1 else 0 end ) rakes_5_12hrs,
 (case when abs(24*extract(day from max(RMVLTIME)-max(LDNGSTRTTIME))+extract(hour from max(RMVLTIME)-max(LDNGSTRTTIME)))>12 
or ( abs(24*extract(day from max(RMVLTIME)-max(LDNGSTRTTIME))+extract(hour from max(RMVLTIME)-max(LDNGSTRTTIME)))=12 and  extract( minute from max(RMVLTIME)-max(LDNGSTRTTIME))>0 )
then 1 else 0 end ) rakes_12hrs
FROM SALES_BILLS.fois_rake_details 
WHERE trunc(RMVLTIME) between to_date(:FROMDT,'dd-MON-yyyy') and  to_date(:TODT,'dd-MON-yyyy')
 GROUP BY DMNDID,LDNGSTTN,CNSR
) k
GROUP BY k.cnsr`;
  const binds = { FROMDT: req.query.from, TODT: req.query.to };
  dbQuery(query, binds);
});

module.exports = router;
