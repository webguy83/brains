BEGIN TRANSACTION;

INSERT INTO users
  (name, email, entries, joined)
VALUES
  ('Fag', 'fucknuts@fuck.com', 4, '2020-02-10')

INSERT INTO login
  (hash, email)
VALUES
  ('$2y$12$QJ37f3EBCDVmKwNYNgJj1OJEKCGu8dTAafqFOzuzegjGKZYx3CGo2
', 'fucknuts@fuck.com')

COMMIT;