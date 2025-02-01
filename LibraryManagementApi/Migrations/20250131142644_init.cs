using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryManagementApi.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    nm = table.Column<string>(type: "varchar(30)", nullable: false),
                    author = table.Column<string>(type: "varchar(30)", nullable: false),
                    publication = table.Column<string>(type: "varchar(30)", nullable: false),
                    year = table.Column<string>(type: "varchar(10)", nullable: false),
                    category = table.Column<string>(type: "varchar(30)", nullable: false),
                    stock = table.Column<int>(type: "int", nullable: false),
                    availableStock = table.Column<int>(type: "int", nullable: false),
                    isDel = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    nm = table.Column<string>(type: "varchar(30)", nullable: false),
                    address = table.Column<string>(type: "varchar(100)", nullable: false),
                    mobile = table.Column<string>(type: "varchar(10)", nullable: false),
                    email = table.Column<string>(type: "varchar(20)", nullable: false),
                    admissionDate = table.Column<DateTime>(type: "DateTime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Members", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    unm = table.Column<string>(type: "varchar(20)", nullable: false),
                    pwd = table.Column<string>(type: "varchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookIssues",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    memberId = table.Column<int>(type: "int", nullable: false),
                    bookId = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateTime>(type: "DateTime", nullable: false),
                    duedate = table.Column<DateTime>(type: "DateTime", nullable: false),
                    returnDate = table.Column<DateTime>(type: "DateTime", nullable: true),
                    remark = table.Column<string>(type: "varchar(100)", nullable: true),
                    isReturn = table.Column<bool>(type: "bit", nullable: false),
                    isDel = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookIssues", x => x.id);
                    table.ForeignKey(
                        name: "FK_BookIssues_Books_bookId",
                        column: x => x.bookId,
                        principalTable: "Books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookIssues_Members_memberId",
                        column: x => x.memberId,
                        principalTable: "Members",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookIssues_bookId",
                table: "BookIssues",
                column: "bookId");

            migrationBuilder.CreateIndex(
                name: "IX_BookIssues_memberId",
                table: "BookIssues",
                column: "memberId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookIssues");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Members");
        }
    }
}
