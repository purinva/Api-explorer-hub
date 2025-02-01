using Microsoft.AspNetCore.Mvc;

public class ContactManagementController : BaseController
{
    private readonly IPaginationStorage storage;

    public ContactManagementController(IPaginationStorage storage)
    {
        this.storage = storage;
    }

    [HttpPost("contacts")]
    public IActionResult Create([FromBody] Contact contact)
    {
        Contact res = storage.Add(contact);
        if (res != null)
        {
            return Ok(contact);
        }
        return Conflict("Контакт с указанным ID существует");
    }

    [HttpGet("contacts")]
    public ActionResult<List<Contact>> GetContacts()
    {
        return Ok(storage.GetContacts());
    }

    [HttpDelete("contacts/{id}")]
    public IActionResult DeleteContact(int id)
    {
        bool res = storage.Remove(id);
        if (res) return NoContent();
        return BadRequest("Неверный id");
    }

    [HttpPut("contacts/{id}")]
    public IActionResult UpdateContact([FromBody] ContactDto contactDto, int id)
    {
        bool res = storage.UpdateContact(contactDto, id);
        if (res) return Ok();
        return Conflict("Контакт с указанным ID не нашелся");
    }

    [HttpGet("contacts/{id}")]
    public IActionResult GetContact(int id)
    {
        var contact = storage.GetContactById(id);
        if (contact != null)
        {
            return Ok(contact);
        }
        return NotFound();
    }

    [HttpGet("contacts/page")]
    public IActionResult GetContacts(int pageNumber = 1, int pageSize = 5)
    {
        var (contatcs, total) = storage.GetContacts(pageNumber, pageSize);
        var response = new 
        {
            Contacts = contatcs,
            TotalCount = total, 
            CurrentPage = pageNumber,
            PageSize = pageSize
        };
        return Ok(response);
    }
}