using LibraryManagementApi.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.Dto
{
    public class BookIssueDto
    {
        public int memberId { get; set; }
       
        public int bookId { get; set; }
      
        public DateTime date { get; set; }

        public DateTime duedate { get; set; }
        public DateTime? returnDate { get; set; }
        public string? remark { get; set; }
    }
}
