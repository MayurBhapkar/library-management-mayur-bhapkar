using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.Dto
{
    public class BookDto
    {
        public string nm { get; set; }

        
        public string author { get; set; }

        
        public string publication { get; set; }

        
        public string year { get; set; }

       
        public string category { get; set; }

       
        public int stock { get; set; }

        public int availableStock { get; set; }
    }
}
