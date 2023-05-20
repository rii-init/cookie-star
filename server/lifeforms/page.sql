/************
 *
 *   Page
 *   
 *   Editable form of static html page.
 *
 *
 ************/

CREATE TABLE page(
    page_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    page_title VARCHAR(255) NOT NULL,
    page_content TEXT NOT NULL,
    page_date DATETIME NOT NULL,
    page_author INT UNSIGNED NOT NULL,
    PRIMARY KEY (page_id),
    FOREIGN KEY (page_author) REFERENCES user(user_id)
);