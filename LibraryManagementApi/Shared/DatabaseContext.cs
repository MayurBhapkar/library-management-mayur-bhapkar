using LibraryManagementApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApi.Shared
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<user> users { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<Member> Members { get; set; }

        public DbSet<BookIssue> BookIssues { get; set; }
    }
}
