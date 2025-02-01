using LibraryManagementApi.Dto;
using LibraryManagementApi.Entities;
using LibraryManagementApi.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookIssueController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public BookIssueController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: api/<BookIssueController>
        [HttpGet]
        public IActionResult Get()
        {
            var res = _dbContext.BookIssues.Include(x => x.Member).Include(x => x.Book).ToList();
            return new JsonResult(res);
        }

        // GET api/<BookIssueController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var res = _dbContext.BookIssues.FirstOrDefault(x => x.id == id);
            return new JsonResult(res);
        }

        [HttpPost("betweendt")]
        public IActionResult betweendt([FromBody] BetweenDateDto value)
        {
            var res = _dbContext.BookIssues
                .Include(x => x.Member)
                .Include(x => x.Book)
                .Where(x => x.isDel == false && x.date >= value.startdt && x.date <= value.enddt)
                 .OrderBy(x => x.duedate)
                .ToList();
            return new JsonResult(res);

        }

        //[HttpGet("getcount")]
        //public IActionResult getcount()
        //{
        //    var res = _dbContext.BookIssues
        //        .Include(x => x.Member)
        //        .Include(x => x.Book)
        //        .Where(x => x.isDel == false && x.date == DateTime.UtcNow.Date)
        //         .OrderBy(x => x.duedate)
        //        .ToList();

        //    var res1= res.Where(x => x.returnDate == DateTime.UtcNow.Date).Count()
        //    return new JsonResult(new {count=res.Count,returncount= });

        //}



        // POST api/<BookIssueController>
        [HttpPost]
        public IActionResult Post([FromBody] BookIssueDto value)
        {
            int Id = _dbContext.BookIssues.Select(p => p.id).DefaultIfEmpty().Max();

            var book = _dbContext.Books.Where(x=>x.id == value.bookId).FirstOrDefault();

            BookIssue bookIssue = new BookIssue()
            {
                id = Id + 1,
                memberId = value.memberId,
                bookId = value.bookId,
                date = value.date,
                duedate = value.duedate,
                remark = value.remark,
                isDel = false,
                isReturn = false,
            };
            book.availableStock = book.availableStock - 1;
            _dbContext.Books.Update(book);

            _dbContext.BookIssues.Add(bookIssue);
            _dbContext.SaveChanges();
            return new JsonResult(new { message = "Record Saved Successfully." });

        }

        // PUT api/<BookIssueController>/5
        [HttpPost("update/{id}")]
        public IActionResult update(int id, [FromBody] BookIssueDto value)
        {
            var res = _dbContext.BookIssues.FirstOrDefault(x => x.id == id);

            res.memberId = value.memberId;
            res.bookId = value.bookId;
            res.date = value.date;
            res.duedate = value.duedate;
            res.remark = value.remark;
            
            _dbContext.BookIssues.Attach(res);
            _dbContext.SaveChanges();
            return new JsonResult(new { message = "Record Updated Successfully." });
        }


        [HttpPost("isReturn/{id}")]
        public IActionResult isReturn(int id)
        {
            var res = _dbContext.BookIssues.FirstOrDefault(x => x.id == id);

            var book = _dbContext.Books.Where(x => x.id == res.bookId).FirstOrDefault();

            res.isReturn = true;
            res.returnDate = DateTime.UtcNow;

            book.availableStock = book.availableStock + 1;
            _dbContext.Books.Update(book);

            _dbContext.BookIssues.Attach(res);
            _dbContext.SaveChanges();
            return Ok();
        }

       

        // DELETE api/<BookIssueController>/5
        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var res = _dbContext.BookIssues.FirstOrDefault(x => x.id == id);

            var book = _dbContext.Books.Where(x => x.id == res.bookId).FirstOrDefault();

            res.isDel = true;

            book.availableStock = book.availableStock + 1;
            _dbContext.Books.Update(book);

            _dbContext.BookIssues.Attach(res);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
