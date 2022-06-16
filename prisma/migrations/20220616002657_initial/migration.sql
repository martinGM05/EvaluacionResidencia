-- CreateTable
CREATE TABLE `t2_appuser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t2_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `author_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    INDEX `author_id`(`author_id`),
    INDEX `post_id`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t2_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(256) NOT NULL,
    `content` VARCHAR(2048) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `author_id`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t2_comment` ADD CONSTRAINT `t2_comment_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `t2_appuser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `t2_comment` ADD CONSTRAINT `t2_comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `t2_post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `t2_post` ADD CONSTRAINT `t2_post_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `t2_appuser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
