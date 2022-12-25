# نکات

-----

## Iteration - تعداد چرخش در توابع

-----
این متغیر جهت معین کردن طول رشته ی درخواستی است.

        هر یک چرخش یک عدد به توان 2 اضافه میکند، 2 چرخش برابر است با 2به توان 2
     در نتیجه تا چهار حرف تولید میکند.
     "abcd"
     let maxWordsize = Math.pow(2, iteration); //Maximum "Word Lenght"

## Total word تعداد کل ترکیب ها

-----
 تعداد ترکیب ها بر اساس تعداد حرف و طول نهایی رشته میباشد.

    اگر 5 حرف داشته باشیم و بخواهیم ترکیبات آن را به طول رشته 6 حرفی محاسبه کنیم، فرمول
    N: chars = [1,2,3,4,5]
    K: Created Word Lenght: 1-> "x" , 2-> "x,y", ... , 6:"yxszht"
    N = تعداد حرف
    K = طول رشته ترکیبی
    
    N^K + N^(K-1) + N^(K-2) + ... + N^(1)
    5^6 + 5^5 + 5^4 + 5^3 + 5^2 + 5^1 = 19530

## محدودیت در اول و آخر

---
این محدودیت ها به این معناست که برای ساخت ترکیب ها هرگز از یک کلمه در اول یا آخر آن استفاده نشود. بدین منظور تابع removeUnwanted نوشته شده است که بعد از ساخت ترکیب ها موارد ناقص را خارج میکند.

دقت کنید فرمول های تولید ترکیب در حال حاظر این قابلیت را ندارند در حین اجرا از این موارد صرف نظر کنند زیرا اکثر ترکیب های تولید شده بر اساس ترکیبات تولید شده در مرحله های قبل می باشد.