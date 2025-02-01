using LibraryManagementApi.Dto;
using LibraryManagementApi.Entities;
using LibraryManagementApi.Shared;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public BookController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: api/<BookController>
        [HttpGet]
        public IActionResult Get()
        {
            var res = _dbContext.Books.ToList();
            return new JsonResult(res);
        }

        // GET api/<BookController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var res = _dbContext.Books.FirstOrDefault(x => x.id == id);
            return new JsonResult(res);
        }

        [HttpGet("list")]
        public async Task<IActionResult> list()
        {
            try
            {
                return new JsonResult(_dbContext.Books.Select(x => new
                {
                    ID = x.id,
                    Name = x.nm,
                }).ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("stock")]
        public async Task<IActionResult> stock()
        {
            try
            {
                return new JsonResult(_dbContext.Books.Select(x => new
                {
                    ID = x.id,
                    Name = x.nm,
                    Stock = x.stock,
                    AvailableStock = x.availableStock,
                }).ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/<BookController>
        [HttpPost]
        public IActionResult Post([FromBody] BookDto value)
        {
            int Id = _dbContext.Books.Select(p => p.id).DefaultIfEmpty().Max();
            Book book = new Book()
            {
                id = Id + 1,
                nm = value.nm,
                author = value.author,
                publication = value.publication,
                year = value.year,
                category = value.category,
                stock = value.stock,
                availableStock = value.stock
            };

            _dbContext.Books.Add(book);
            _dbContext.SaveChanges();
            return new JsonResult(new { message = "Record Saved Successfully." });

        }

        // PUT api/<BookController>/5
        [HttpPost("update/{id}")]
        public IActionResult update(int id, [FromBody] BookDto value)
        {
            var res = _dbContext.Books.FirstOrDefault(x => x.id == id);

            res.nm = value.nm;
            res.author = value.author;
            res.publication = value.publication;
            res.year = value.year;
            res.category = value.category;
            res.stock = value.stock;
            res.availableStock = value.stock;

            _dbContext.Books.Attach(res);
            _dbContext.SaveChanges();
            return new JsonResult(new { message = "Record Updated Successfully." });
        }

       

        // DELETE api/<BookController>/5
        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var res = _dbContext.Books.FirstOrDefault(x => x.id == id);

            res.isDel = true;

            _dbContext.Books.Update(res);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
