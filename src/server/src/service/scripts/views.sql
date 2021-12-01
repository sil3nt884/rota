CREATE VIEW assigned_tasks AS
select t.id,
       t.assigneeID,
       t.title,
       t.description,
       t.image,
       t.state,
       a.name as assignee
       from task t join assignee a on t.assigneeID = a.id and t.state != 'done';

CREATE VIEW unsigned_tasks AS
select t.id,
       t.assigneeID,
       t.title,
       t.description,
       t.description,
       t.image,
       t.state
 from task t where t.assigneeID IS NULL;

CREATE VIEW assignees AS
select a.id,
       a.name
from assignee a;


CREATE VIEW done_tasks AS
select t.id,
       t.assigneeID,
       t.title,
       t.description,
       t.description,
       t.image,
       t.state
from task t where t.state = 'done'
