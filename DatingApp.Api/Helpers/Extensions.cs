using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Helpers
{
    // make this class static class then class  can't intiated anywhere else
    public  static class Extensions
    {
        //we can see using global exceptino handler it will return 500 with error message in body, we can add message as a new  reponse header option and we can configure it
        public static void AddApplicationError(this HttpResponse respnse, string message)
        {
            respnse.Headers.Add("Application-Error", message);
            respnse.Headers.Add("Access-Control-Expose-Header", "Application-Error");
            //allow anywhere from  orgin say it by using the wildcard
            respnse.Headers.Add("Access-Control-Allow-Origin", "*");
        }

    }
}
