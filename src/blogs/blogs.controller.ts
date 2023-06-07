import { Controller, Req, Get } from '@nestjs/common'; // here Request or Req and Response or Res
import { Request } from 'express';

// by default nest automatically set http code like fot get request its set 200, for post request 201 and so on but if we want to override it then we can use HttpCode decorator from nest common
@Controller('blogs')
export class BlogsController {
  // @Get()
  // // @HttpCode(201)
  // // OR
  // @HttpCode(HttpStatus.CREATED) // commonly used status code enumrations
  // // @HttpCode(HttpStatusNO_CONTENT)
  // @Header('Cache-control', 'none')
  // @Header('Authorization', 'Bearer token')
  // @Redirect('/users', 302) // by default redirect use status 302 but we can use 301 and 307 redirect permanently or temporarily
  // // getBlog(@Req() req: Request, @Res() res: Response) { // here @Req and @Res order does not matters
  // // when we inject Res in or Request handler method then it will not return any response to us we have to manually return response using Res
  // getBlog(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   // by using { passthrough: true } is Res we say nest we will set http status, headers, cookies or something else by ourself but you have to send response by yourself
  //   console.log({
  //     originalUrl: req.originalUrl,
  //     url: req.url,
  //     baseUrl: req.baseUrl,
  //     res,
  //   });
  //   res.status(200);
  //   // res.json({ album: 'album1' });
  //   return { album: 'album1' }; // { passthrough: true }
  // }

  // dynamically redirect to any route
  @Get()
  getBlog(@Req() req: Request) {
    const rn = ~~(Math.random() * 10 + 1);
    if (rn < 5) {
      return { url: 'blogs/list', statusCode: 302 };
    } else {
      return { url: 'blogs/comments', statusCode: 302 };
    }
  }

  // @Get('/list')
  // getBlogs(@Req() req: Request) {
  //   return 'list';
  //   return { data: ['album1', 'album2'] };
  // }

  @Get('list')
  redirectList() {
    return 'list';
  }

  @Get('comments')
  redirectComments() {
    return 'comments';
  }
}
